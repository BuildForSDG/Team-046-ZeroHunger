const Agent = require('../Models/User');

export const createAgent = async (req, res) => {
  console.log(req, res, "------------")
  // const agent = new Agent({
  //   firstname: req.body.firstname,
  //   lastname: req.body.lastname,
  //   email: req.body.email,
  //   password: req.body.password
  // });
  res.send().json({ message: 'i got here' });
  // const checkRes = await agent.save();
  // console.log(checkRes);
//   //agent.save().then(
//     //() => {
//      // res.send(201).json({
//         message: 'Post saved successfully!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error
//       });
//     }
//   );
};

exports.getOneAgent = (req, res) => {
  Agent.findOne({
    _id: req.params.id
  }).then(
    (agent) => {
      res.status(200).json(agent);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error
      });
    }
  );
};

exports.modifyOneAgent = (req, res) => {
  const agent = new Agent({
    _id: req.params.id,
    firstname: req.body.title,
    lastname: req.body.description,
    email: req.body.imageUrl,
    password: req.body.price
  });
  Agent.updateOne({ _id: req.params.id }, thing).then(
    () => {
      res.status(201).json({
        message: 'Agent updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error
      });
    }
  );
};

exports.deleteAgent = (req, res) => {
  Agent.deleteOne({ _id: req.params.id }).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error
      });
    }
  );
};

exports.getAllAgent = (req, res) => {
  Agent.find().then(
    (agent) => {
      res.status(200).json(agent);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error
      });
    }
  );
};
