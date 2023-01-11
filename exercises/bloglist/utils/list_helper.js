const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (accumulator, current) => {
    // console.log("accumalator: ",accumulator, "accumalator.like: ",accumulator.likes, "current: ",current, "current.like: ",current.likes)
    // first time the accumulator is still correct 5 likes + 7 likes from the get go with array[0].likes and array[1].likes, however after that it's wrong as accumalator = 12 12.likes = null + current.likes = 10 which is just null
    // if we don't specify initial value as 0 the first accumaltor is the whole object of array[0] + the likes of array[1].likes which equal to obj{}7 so concatenating object to integer
    return accumulator + current.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let mostlikes = Math.max(...blogs.map((blog) => blog.likes))

  const result = blogs.find((blog) => {
    return blog.likes === mostlikes
  })
  console.log(result)
  return { title: result.title, author: result.author, likes: result.likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
