import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import {DateTime} from 'luxon'

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

  public async findById({ params }: HttpContextContract) {
    const lstDatabyId = await Post.findBy('id', params.id)
    return lstDatabyId
  }

  public async delete({ params }: HttpContextContract) {
    const delPost = await Post.findByOrFail('id', params.id)
    await delPost.delete()
    return 'Deletado com sucesso!'
  }

  /**
   * async update
   */
  public async update({ params, request }: HttpContextContract) {
    const put = await Post.findByOrFail('id', params.id)
    const data = request.only(['title', 'content'])
    put.merge(data)
    put.updatedAt = DateTime.local()
    await put.save()
    return 'Salvo com sucesso!'
  }

}
