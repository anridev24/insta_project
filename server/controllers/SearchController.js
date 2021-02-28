const axios = require('axios')

const searchUrl = keyword =>
  `https://www.instagram.com/web/search/topsearch/?context=blended&query=${keyword}&rank_token=0.13893792641661795&include_reel=true`

exports.get_results_get = async (req, res) => {
  try {
    const searchKeyword = req.params.keyword

    const builtSearchUrl = searchUrl(searchKeyword)
    const searchRequest = await axios.get(builtSearchUrl)
    const responseJson = await searchRequest.data

    const users = responseJson['users']
    const hashtags = responseJson['hashtags']

    const formattedUsers = users.map(userObject => {
      const user = userObject.user

      return {
        type: 'user',
        image: user.profile_pic_url,
        username: user.username,
      }
    })

    const formattedHashtags = hashtags.map(hashtagObject => {
      const hashtag = hashtagObject.hashtag

      return {
        type: 'hashtag',
        image: hashtag.profile_pic_url,
        name: hashtag.name,
        mediaCount: hashtag.media_count,
      }
    })

    const dataPayload = {
      users: formattedUsers,
      hashtags: formattedHashtags,
    }

    res.send(dataPayload)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ message: 'Internal Server Error', error: e.message })
  }
}
