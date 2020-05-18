import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  /**
   * async index
   */
  public async index() {
    const posts = await Post.all()

    return posts
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['title', 'content'])
    const post = await Post.create(data)
    return post
  }

  public async findById({ params }) {
    const lstDatabyId = await Post.findBy('id', params.id)
    return lstDatabyId
  }
}
