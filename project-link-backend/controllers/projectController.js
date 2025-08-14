const Project = require('../models/project');
const Client = require('../models/client');

//create a new project
exports.createProject = async (req, res) => {
  try {
    let clientId;

    if (req.body.client) {
      clientId = req.body.client;
    } else {
     
      const client = await Client.findOne({ user: req.userInfo.id });
      if (!client) return res.status(404).json({ message: 'you need to create a profile first' });
      clientId = client._id;
    }

    const project = new Project({
      ...req.body,
      client: clientId,
      user: req.body.user || req.userInfo?.id || req.user?.id
    });

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "both fields are required" });
  }
};

//get all projects
exports.getProjects = async (req, res) => {
  const { clientName } = req.query; // ?clientName=name
  const userId = req.userInfo.id;
  const userRole = req.userInfo.role;

  //filter by role
  let filter = userRole === 'admin' ? {} : { user: userId };

  try {
        if (clientName) {
        const client = await Client.findOne({ name: new RegExp(clientName.trim(), 'i') });

        if (client) {
            filter.client = client._id;
        } else {
            return res.json([]); // No match, return empty array
        }
        }

        const projects = await Project.find(filter)
        .populate('client', 'name') // include client name only
        .populate('user', 'email'); // include user email only
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
};


//get project by id
exports.getProjectById = async (req, res) => {
  try {
        const project = await Project.findById(req.params.id).populate('client');
        if (!project) 
        return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Edit Project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//get project by client
exports.getProjectsByClient = async (req, res) => {
  try {
    const projects = await Project.find({ client: req.params.clientId });
    res.json(projects);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//get project by user
exports.getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userInfo.id }); // only projects belonging to this user
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user projects' });
  }
};


