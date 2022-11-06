const { request, response } = require("express")
const express = require("express")
const uuid = require("uuid")
const port = 3001
const app = express()
app.use(express.json())
/*  
     Query params = > meusite.com/user?nome=marcelo&age=28  //FILTROS
     Route params => /users/2   BUSCAR. DELETE OU ATUALIZAR ALGO ESPECIFICO

     GET   =>Buscar Informações no back-end
     POST  => Criar informações no back-end
     PU/ PATCH => Alterar/Atualizar informações o back-end
     DELETE =>Deletar informações do back-end

     MIDDLEWARE => INTERCEPTADOR =. tem o poder de parar ou alterar dados de requisição
*/





const users = []
const chekUserId = (request,response,next) =>{
    const {id} = request.params /*Pegando Id */
    const index  = users.findIndex(user => user.id === id) /*onde usuario esta no array e retorna onde ele esta se não encontrar cai no if*/
    if (index < 0){
        return response.status(404).json({mesaage: "user not found"})
    }
    request.userIndex = index
    request.userId = id
    next()

    
}

app.get("/users",(request,response) => {
 
    return response.json(users)
})
app.post("/users",(request,response) => {
    const {name, age} =request.body

    const user = { id: uuid.v4(), name, age}

    users. push(user)
    return response.status(201).json(user)
})
app.put("/users/:id",chekUserId,(request,response) => {

    
    const {name,age} = request.body /*Trazendo informações do body*/
    const index = request.userIndex
    const id = request.userId
    const updateUser = {id, name, age} /*Criando o usuario atualizado*/
   
    users[index] = updateUser /*Vai ate o array usuario e atualizo*/

    return response.json(updateUser) /*Mostro em tela o usario que foi atualizado*/
})
app.delete("/users/:id",chekUserId,(request,response) => {
    
    const index = request.userIndex

    users.splice(index,1)

    return response.status(204).json()
})














app.listen(port,() =>{
    console.log(`Server started on port ${port}😎`)
})