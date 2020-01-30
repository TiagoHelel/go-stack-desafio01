const express = require('express')

const server = express()

server.use(express.json()) 

function checkProjectInArray(req, res, next) {
    const { id } = req.params
    const project = projects.find(p => p.id == id)
    if (!project) {
        return res.status(400).json({ error: 'Project not found'})
    }
    req.project = project
    return next()
}

total = 0
function requisitionsTotal(req, res, next) {
    total += 1
    console.log(`Número de requisições: ${total}`)
    return next()
}

server.use(requisitionsTotal)

const projects = []

server.get('/projects', (req, res) => {
    return res.json(projects)
})

server.get('/projects/:id', checkProjectInArray, (req, res) => {
    return res.json(req.project)
})

let id = 0
server.post('/projects', (req, res) => {
    id += 1
    // const { id } = req.body         
    const { title } = req.body
    // const projectExists = projects.find(p => p.id == id)
    // if (projectExists) {
    //     return res.status(400).json({ error: 'Project id already in use'})
    // }
    const newProject = { 
        id, 
        title, 
        tasks: [],
    }
    projects.push(newProject)
    return res.json(projects)
})

server.post('/projects/:id/tasks', checkProjectInArray, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const project = projects.find(p => p.id == id)
    project.tasks.push(title)
    return res.json(project)         
})

server.put('/projects/:id', checkProjectInArray, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const project = projects.find(p => p.id == id)
    project.title = title
    return res.json(projects)
})         

server.delete('/projects/:id', checkProjectInArray, (req, res) => {
    const { id } = req.params
    const projectIndex = projects.findIndex(p => p.id == id)
    projects.splice(projectIndex, 1)
    return res.json(projects)
})

server.listen(3000)