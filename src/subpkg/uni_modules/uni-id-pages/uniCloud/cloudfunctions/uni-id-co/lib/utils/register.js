const {
  userCollection,
  LOG_TYPE
} = require('../../common/constants')
const {
  ERROR
} = require('../../common/error')
const {
  findUser
} = require('./account')
const {
  getValidInviteCode,
  generateInviteInfo
} = require('./fission')
const PasswordUtils = require('./password')
const merge = require('lodash.merge')

async function realPreRegister (params = {}) {
  const {
    user
  } = params
  const userMatched = await findUser({
    userQuery: user,
    authorizedApp: this.getClientInfo().appId
  })
  if (userMatched.length > 0) {
    throw {
      errCode: ERROR.ACCOUNT_EXISTS
    }
  }
}

async function preRegister (params = {}) {
  try {
    await realPreRegister.call(this, params)
  } catch (error) {
    await this.middleware.uniIdLog({
      success: false,
      type: LOG_TYPE.REGISTER
    })
    throw error
  }
}

async function preRegisterWithPassword (params = {}) {
  const {
    user,
    password
  } = params
  await preRegister.call(this, {
    user
  })
  const passwordUtils = new PasswordUtils({
    passwordSecret: this.config.passwordSecret
  })
  const {
    passwordHash,
    version
  } = passwordUtils.generatePasswordHash({
    password
  })
  const extraData = {
    password: passwordHash,
    password_secret_version: version
  }
  return {
    user,
    extraData
  }
}

async function thirdPartyRegister ({
  user = {}
} = {}) {
  return {
    mobileConfirmed: !!(user.mobile && user.mobile_confirmed) || false,
    emailConfirmed: !!(user.email && user.email_confirmed) || false
  }
}

async function postRegister (params = {}) {
  const {
    user,
    extraData = {},
    isThirdParty = false,
    inviteCode
  } = params
  const {
    appId,
    appName,
    appVersion,
    appVersionCode,
    channel,
    scene,
    clientIP,
    osName
  } = this.getClientInfo()

  merge(user, extraData)

  const registerChannel = channel || scene
  user.register_env = {
    appid: appId || '',
    uni_platform: this.clientPlatform || '',
    os_name: osName || '',
    app_name: appName || '',
    app_version: appVersion || '',
    app_version_code: appVersionCode || '',
    channel: registerChannel ? registerChannel + '' : '', // channel可能为数字，统一存为字符串
    client_ip: clientIP || ''
  }

  user.register_date = Date.now()
  user.dcloud_appid = [appId]

  if (user.username) {
    user.username = user.username.toLowerCase()
  }
  if (user.email) {
    user.email = user.email.toLowerCase()
  }

  const {
    autoSetInviteCode, // 注册时自动设置邀请码
    forceInviteCode // 必须有邀请码才允许注册，注意此逻辑不可对admin生效
  } = this.config
  if (autoSetInviteCode) {
    user.my_invite_code = await getValidInviteCode()
  }

  const isAdmin = user.role && user.role.includes('admin')

  if (forceInviteCode && !isAdmin && !inviteCode) {
    throw {
      errCode: ERROR.INVALID_INVITE_CODE
    }
  }

  if (inviteCode) {
    const {
      inviterUid,
      inviteTime
    } = await generateInviteInfo({
      inviteCode
    })
    user.inviter_uid = inviterUid
    user.invite_time = inviteTime
  }

  const beforeRegister = this.hooks.beforeRegister
  let userRecord = user
  if (beforeRegister) {
    userRecord = await beforeRegister({
      userRecord,
      clientInfo: this.getClientInfo()
    })
  }

  const {
    id: uid
  } = await userCollection.add(userRecord)

  const {
    token,
    tokenExpired
  } = await this.uniIdCommon.createToken({
    uid
  })

  await this.middleware.uniIdLog({
    data: {
      user_id: uid
    },
    type: LOG_TYPE.REGISTER
  })

  return {
    errCode: 0,
    uid,
    newToken: {
      token,
      tokenExpired
    },
    ...(
      isThirdParty
        ? thirdPartyRegister({
          user: {
            ...userRecord,
            _id: uid
          }
        })
        : {}
    )
  }
}

module.exports = {
  preRegister,
  preRegisterWithPassword,
  postRegister
}
