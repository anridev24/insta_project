const Account = require('../models/Account')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register_post = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body

    const emailCandidate = email.toLowerCase()

    const candidate = await Account.findOne({ email: emailCandidate })

    if (candidate) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const account = new Account({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    })

    await account.save()

    res.status(201).json({ message: 'User Created' })
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error', error: e.message })
  }
}

exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body

    const account = await Account.findOne({ email })

    if (!account) {
      return res.status(401).json({ message: "Account With this email doesn't exist" })
    }

    const isMatch = await bcrypt.compare(password, account.password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: account.id }, process.env.jwtSecret, {
      expiresIn: '45m',
    })

    res.json({ token, userId: account.id })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error', error: e.message })
  }
}
exports.saved_content_post = async (req, res) => {
  const { accountId } = req.body

  const account = await Account.findById(accountId)

  const savedContent = {
    users: account.savedUsers,
    hashtags: account.savedHashtags,
  }

  return res.status(200).json(savedContent)
}

exports.accoun_info_post = async (req, res) => {
  const { accountId } = req.body

  const account = await Account.findById(accountId)

  const safePayload = {
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
  }

  res.status(200).json(safePayload)
}

exports.save_post = async (req, res) => {
  try {
    const { type, accountId, InstagramObject } = req.body

    const account = await Account.findById(accountId)

    if (type === 'user') {
      if (account.savedUsers.filter(user => user.username === InstagramObject.username).length > 0) {
        return res.status(400).json({ message: 'Already Saved' })
      }

      account.savedUsers.push(InstagramObject)
      await account.save()

      return res.status(201).json({ message: 'Saved' })
    } else {
      if (account.savedHashtags.filter(hashtag => hashtag.name === InstagramObject.name).length > 0) {
        return res.status(400).json({ message: 'Already Saved' })
      }

      account.savedHashtags.push(InstagramObject)
      await account.save()

      return res.status(201).json({ message: 'Saved' })
    }
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error', error: e.message })
  }
}

exports.delete_post = async (req, res) => {
  const { accountId, InstagramObject, type } = req.body

  const account = await Account.findById(accountId)

  if (type === 'user') {
    const savedUsers = account.savedUsers

    account.savedUsers = savedUsers.filter(user => user.username !== InstagramObject.username)
    await account.save()
    return res.status(200).json({ message: 'Item Deleted' })
  } else {
    const savedHashtags = account.savedHashtags

    account.savedHashtags = savedHashtags.filter(hashtag => hashtag.name !== InstagramObject.name)
    await account.save()
    return res.status(200).json({ message: 'Item Deleted' })
  }
}
