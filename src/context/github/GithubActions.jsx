import axios from "axios"
const GITHUB_API_URL = process.env.REACT_APP_GITHUB_API_URL
const GITHUB_ACCESS_TOKEN = process.env.REACT_APP_GITHUB_ACCESS_TOKEN

const github = axios.create({
    baseURL: GITHUB_API_URL,
    Authorization: `token ${GITHUB_ACCESS_TOKEN}`
})

//SEARCH USERS
export async function searchUsers(text) {

    const params = new URLSearchParams({
        q: text,
    })

    const response = await github.get(`/search/users?${params}`)
    return response.data.items

}


//GET SINGLE USER And its REPOS
export async function getUserAndRepos(login) {

    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`),
    ])

    return { user: user.data, repos: repos.data }

}

