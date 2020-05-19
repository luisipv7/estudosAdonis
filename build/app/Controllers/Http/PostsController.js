"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
const luxon_1 = require("luxon");
class PostsController {
    async index() {
        const posts = await Post_1.default.all();
        return posts;
    }
    async store({ request }) {
        const data = request.only(['title', 'content']);
        const post = await Post_1.default.create(data);
        return post;
    }
    async findById({ params }) {
        const lstDatabyId = await Post_1.default.findBy('id', params.id);
        return lstDatabyId;
    }
    async delete({ params }) {
        const delPost = await Post_1.default.findByOrFail('id', params.id);
        await delPost.delete();
        return 'Deletado com sucesso!';
    }
    async update({ params, request }) {
        const put = await Post_1.default.findByOrFail('id', params.id);
        const data = request.only(['title', 'content']);
        put.merge(data);
        put.updatedAt = luxon_1.DateTime.local();
        await put.save();
        return 'Salvo com sucesso!';
    }
}
exports.default = PostsController;
//# sourceMappingURL=PostsController.js.map