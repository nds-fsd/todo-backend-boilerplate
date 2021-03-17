const e = require('cors');
const { bulkWrite } = require('./schemas/colection');
const Colection = require('./schemas/colection');
const Task = require('./schemas/task');

const testRouter = (app) => {
  app.get('/test', (req, res) => {
    const col = new Colection({
      name: 'My colection',
      icon: 'test',
      color: 'red',
    });
    
    col.save((err, colectionPersisted) => {
      if(err) return res.status(500).json({error: err.getMessage()});

      const tasks = [1,2,3].map((num) => {
        const newTask = new Task({
          description: `task${num}`,
          done: !(num%2),
          colection: colectionPersisted._id
        });
        return newTask;
      });

      Task.collection.insertMany(tasks, (err, result) => {
        if(err) return res.status(500).json({error: err.getMessage()});
          return res.status(200).json({
            colection: colectionPersisted,
            tasks: result.ops
          })
      });
    });
  });


  


  app.post('/task/:id', async (req,res) => {
    const id = req.params.id;
    Task.findById(id, (err, task)=> {
        if(err) return res.status(500).json({error: err.getMessage()});
        return res.status(200).json(task);
    });

    (await Task.findById(id).populate('colection')).execPopulate().then((task) => {
      return res.status(200).json(task);
    }).catch(err =>{
      return res.status(500).json({error: err.getMessage()});
    });
    
    try {
      const task = await Task.findById(id);
    }catch(e){
      return res.status(500).json({error: e.getMessage()});
    }

    return res.status(200).json(task);
  });


  app.get('/task/:id', (req, res)=> {
    const id = req.params.id;
    Task.findById(id).populate('colection').exec((err, task)=> {
      if(err) return res.status(500).json({error: err.getMessage()});
      return res.status(200).json(task);
    });
  });

  app.get("/task", (req,res)=> {
    const query = {};

    if(req.query.colection){
      query.colection = req.query.colection;
    }

    Task.find(query,(err, tasks) => {
      if(err) return res.status(500).json({error: err.getMessage()});
      return res.status(200).json(tasks);
    })
  });

  app.get('/colection/:id', (req, res)=> {
    const id = req.params.id;
    Colection.findById(id,(err, colection)=> {
      if(err) return res.status(500).json({error: err.getMessage()});
      return res.status(200).json(colection);
    });
  });

}

module.exports = testRouter;
