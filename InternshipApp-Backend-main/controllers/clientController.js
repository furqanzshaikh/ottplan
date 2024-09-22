const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createClient = [
  // Validate and sanitize inputs
  body("name").trim().isLength({ min: 4 }).withMessage("Name must be at least 4 characters long").escape(),
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("degree").trim().isLength({ min: 2 }).withMessage("Degree must be at least 2 characters long").escape(),
  body("passoutYear").isInt({ min: 1900, max: new Date().getFullYear() }).withMessage("Invalid passout year"),
  body("college").trim().isLength({ min: 2 }).withMessage("College name must be at least 2 characters long").escape(),
  body("skills").trim().isLength({ min: 2 }).withMessage("Skills must be at least 2 characters long").escape(),
  body("experience").trim().optional().escape(),
  body("certificate").trim().optional().escape(),
  body("city").trim().isLength({ min: 2 }).withMessage("City must be at least 2 characters long").escape(),
  body("state").trim().isLength({ min: 2 }).withMessage("State must be at least 2 characters long").escape(),
  body("joiningDate").optional().isISO8601().toDate().withMessage("Invalid date format"),
  body("address").trim().isLength({ min: 5 }).withMessage("Address must be at least 5 characters long").escape(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, degree, passoutYear, college, skills, experience, certificate, city, state, joiningDate, address } = req.body;
    const year = passoutYear

    try {
      const clientData = await prisma.client.create({
        data: {
          name,
          email,
          degree,
          passoutYear:year,
          college,
          skills,
          experience,
          certificate,
          city,
          state,
          joiningDate: joiningDate || new Date(),
          address,
        },
      });
      res.status(200).json(clientData);
    } catch (error) {
      console.error("Error creating intern data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

exports.getClients = async (req, res) => {
    try {
      const allIClients = await prisma.client.findMany();
      res.status(200).json(allIClients);
    } catch (error) {
      console.error("Error fetching interns:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  };

  exports.getClientById = async (req, res) => {
    try {
      const { id } = req.params;
      const client = await prisma.client.findUnique({ where: { id: parseInt(id) } });
      if (!client) {
        return res.status(404).json({ error: "client not found" });
      }
      res.status(200).json(client);
    } catch (error) {
      console.error("Error fetching client:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  };

  exports.updateClient = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        email,
        degree,
        passoutYear,
        college,
        skills,
        experience,
        certificate,
        city,
        state,
        joiningDate,
        address,
      } = req.body;
      const year = parseInt(passoutYear)

  
      const updatedClient= await prisma.client.update({
        where: { id: parseInt(id) },
        data: {
          name,
          email,
          degree,
          passoutYear:year,
          college,
          skills,
          experience,
          certificate,
          city,
          state,
          joiningDate,
          address,
        },
      });
  
      res.status(200).json(updatedClient);
    } catch (error) {
      console.error("Error updating intern:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  };

  exports.deleteClient = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.Client.delete({ where: { id: parseInt(id) } });
      res.status(200).json({ message: "Client deleted successfully!", clientId: id });
    } catch (error) {
      console.error("Error deleting Cleint:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  };
  