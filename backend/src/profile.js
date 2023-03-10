const profiles = {}

const createProfile = (username) => {
  if (typeof username !== 'string' || username.trim().length === 0) {
    throw new Error('Unable to create profile: Invalid Username')
  }

  if (profiles[username]) {
    throw new Error('Unable to create profile: Profile already exists')
  }

  const profileData = {
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
  }

  profiles[username] = profileData

  return { success: true, message: 'Profile created successfully !' }
}

const generateProfile = (username) => {
  // input validation for username
  if (typeof username !== 'string' || username.trim().length === 0) {
    throw Error('Unable to generate profile: Invalid Username')
  }

  const profileData = profiles[username]

  if (!profileData) {
    throw new Error('Unable to generate profile: Profile does not exist')
  }

  // Generating random profile data
  profileData.fullName = 'peter'
  profileData.address1 = '9703 Dunlap Ave'
  profileData.address2 = ''
  profileData.city = 'Cleveland'
  profileData.state = 'OH'
  profileData.zipcode = '44090'

  return { success: true, message: 'Profile generated successfully !' }
}

const updateProfile = (username, profileData) => {
  if (typeof username !== 'string' || username.trim().length === 0) {
    throw new Error('Unable to update profile: Invalid Username')
  }

  if (!profiles[username]) {
    throw new Error('Unable to update profile: Profile does not exist')
  }

  const validKeys = [
    'fullName',
    'address1',
    'address2',
    'city',
    'state',
    'zipcode',
  ]

  // input validation for the fields of profileData
  Object.keys(profileData).forEach((key) => {
    if (!validKeys.includes(key)) {
      throw new Error(`Invalid field provided: ${key}`)
    }
    if (key === 'zipcode' && !/^[0-9]{5}$/.test(profileData.zipcode)) {
      throw new Error('Invalid zipcode provided')
    }
    if (
      (key === 'state' ||
        key === 'city' ||
        key === 'address1' ||
        key === 'address2' ||
        key === 'fullName') &&
      typeof profileData[key] !== 'string'
    ) {
      throw new Error(`${key} should be a string`)
    }
  })

  const existingProfile = profiles[username]
  const updatedData = Object.assign({}, existingProfile, profileData)

  profiles[username] = updatedData

  return { success: true, message: 'Profile updated successfully !' }
}

module.exports = { createProfile, generateProfile, updateProfile, profiles }
