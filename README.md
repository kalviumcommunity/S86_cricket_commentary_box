Here is the updated README file:

---

**Project Title**: Cricket Commentary Bot

**Project Overview**: A web application where users can generate humorous and exaggerated cricket commentary for their favorite matches. The bot will use a mix of real cricket terms and funny phrases to create entertaining commentary.

**Key Features**:
- Input match details (teams, players, scores)
- Generate humorous commentary based on the input
- Option to choose different commentary styles (e.g., serious, funny, over-the-top)
- Share the generated commentary on social media
- Save and revisit past commentaries

**Tech Stack**:
- Frontend: React, CSS, HTML
- Backend: Node.js, Express.js
- Database: MongoDB

**Why This Project**: This project combines the excitement of cricket with the fun of creative writing. You'll develop skills in frontend and backend development, user authentication, and natural language processing. Plus, it's a great way to bring some humor to the cricketing world!

**Installation Instructions**:
1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the server: `node server.js`
4. Open your browser and navigate to `http://localhost:3000`

**Server Details**:
The `server.js` file includes the basic setup for our Express.js server:
```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Basic /ping route
app.get('/ping', (req, res) => {
  res.status(200).send('Hey, This is Mukesh');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

**Future Enhancements**:
- Integrate with a cricket API for real-time match data.
- Implement user authentication for personalized commentaries.
- Add more commentary styles and phrases to keep it fresh and entertaining.
- Create a mobile app version for on-the-go fun.

Happy coding! 😊

---

Feel free to customize this further if needed! 🚀