import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";
import { randomUUID } from 'node:crypto'

const database = new Database

export const routes = [
  {
    method: 'POST',
    url: buildRoutePath('/tasks'),
    handler: (req, res) => {

      const tasks = {
        id: randomUUID(),
        title: req.body.title, 
        description: req.body.description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      database.insert('tasks', tasks);

      return res.writeHead(201).end('')
    }
  },
  {
    method: 'GET',
    url: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search,
      } : null);

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PUT',
    url: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      database.update('tasks', id, {
        title,
        description,
        updated_at: new Date(),
      })

      return res.writeHead(204).end();
    }
  },
  {
    method: 'DELETE',
    url: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('tasks', id)

      return res.writeHead(204).end();
    }
  },
  {
    method: 'PATCH',
    url: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      database.complete('tasks', id, {
        completed_at: new Date()
      })

      return res.writeHead(200).end();
    }
  }
]