import Cliente from '#models/cliente'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientesController {
  async index({request}: HttpContext) {
  
      const page = request.input('page', 1)
      const howMany = request.input('howMany', 5)
  
      return await Cliente.query().paginate(page, howMany)
    }
  
    async show({params}: HttpContext){
      return await Cliente.findOrFail(params.id)
    }
    
    async store({request}: HttpContext){
  
      const dados = request.only(['nome', 'telefone', 'email', 'cartaoId', 'enderecoId'])
  
      return await Cliente.create(dados)
    }
  
    async update({params, request}: HttpContext){
      const cliente = await Cliente.findOrFail(params.id)
      const dados = request.only(['nome', 'telefone', 'email', 'cartaoId', 'enderecoId'])
  
      cliente.merge(dados)
  
      return await cliente.save()
    }
  
    async destroy({params}: HttpContext){
      const cliente = await Cliente.findOrFail(params.id)
      
      await cliente.delete()
      return {msg: 'Registro deletedo com sucesso', cliente}
    }
}