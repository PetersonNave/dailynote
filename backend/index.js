const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/meetings", async (req, res) => {
  const { participants, topics } = req.body;
 
  
  // Separar os IDs informados
  const allParticipantIds = participants
    .filter((p) => p.id)
    .map((p) => p.id);

  // Buscar participantes que realmente existem
  const existingParticipants = await prisma.participant.findMany({
    where: {
      id: { in: allParticipantIds },
    },
  });
  
  const participantsToConnect = existingParticipants.map((p) => ({ id: p.id }));
  const connectedIds = participantsToConnect.map(p => p.id);
  const participantsToCreate = participants.filter(
    (p) => !connectedIds.includes(p.id)
  );
 
  
  try {
    const meeting = await prisma.meeting.create({
      data: {
        participants: {
          create: participantsToCreate,
          connect: participantsToConnect,
        },
        topics: {
          create: topics,
        },
      },
      include: {
        participants: true,
        topics: true,
      },
    });

    res.json(meeting);
  } catch (error) {
    console.error("Erro ao criar reunião:", error);
    res.status(500).json({ error: "Erro ao criar reunião" });
  }
});


app.get("/meetings/:id", async (req, res) => {
  const meeting = await prisma.meeting.findUnique({
    where: { id: req.params.id },
    include: {
      participants: true,
      topics: true,
    },
  });

  if (!meeting) return res.status(404).json({ error: "Not found" });
  res.json(meeting);
});

app.get("/meetings", async (req, res) => {
  const meetings = await prisma.meeting.findMany({
    include: {
      participants: true,
      topics: true,
    },
  });

  res.json(meetings);
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
