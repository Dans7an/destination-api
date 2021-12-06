const express = require("express");
let { destinations } = require("./data");
const { generateUniqueId } = require("./services");
const app = express();
const fetch = require("node-fetch");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
// app.use(express.urlencoded())

// Port or Address
app.listen(process.env.PORT || 4000);

app.get("/", function (req, res) {
  res.render("index.ejs", { destinations });
});

app.get("/destinations", (req, res) => {
  res.render("index.ejs", { destinations });
});

function fetchReq(name, location){
  try {
    const API_KEY = "";
    const UNSPLASH_URL = `https://api.unsplash.com/photos/random?client_id=wQuC3g7JmlN_8yTfq4Hk9247zZRTDzpaZSQyE1b32bE&q=${name} ${location}`;

    const fetchRes = await fetch(UNSPLASH_URL);
    const data = await fetchRes.json();
    dest.photo = data.urls.small;
  } catch (error) {
    dest.photo =
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80";
  }

}

app.post("/destinations", async (req, res) => {
  const { name, location, description } = req.body;

  if (!name || name.length === 0 || !location || location.length === 0) {
    return res
      .status(400)
      .json({ message: "Name and Location are both required" });
  }

  const dest = { id: generateUniqueId(), name, location };

  try {
    const API_KEY = "";
    const UNSPLASH_URL = `https://api.unsplash.com/photos/random?client_id=wQuC3g7JmlN_8yTfq4Hk9247zZRTDzpaZSQyE1b32bE&q=${name} ${location}`;

    const fetchRes = await fetch(UNSPLASH_URL);
    const data = await fetchRes.json();
    dest.photo = data.urls.small;
  } catch (error) {
    dest.photo =
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80";
  }

  if (description && description.length !== 0) {
    dest.description = description;
  }
  console.log(dest);
  destinations.push(dest);
  res.redirect("/destinations");
});

// app.put("/destinations/:id", (req, res) => {
//   const destId = req.params.id;
//   const { name, location, photo, description } = req.body;

//   //   if (!name || name.length === 0 || !location || location.length === 0) {
//   //     return res
//   //       .status(400)
//   //       .json({ message: "Name and Location are both required" });
//   //   }

//   for (let index = 0; index < destinations.length; index++) {
//     const element = destinations[index];
//     if (element.id == destId) {
//       //   element.name = name;
//       //   element.location = location;

//       if (name && name.length !== 0) {
//         element.name = name;
//       }

//       if (location && location.length !== 0) {
//         element.location = location;
//       }

//       if (photo && photo.length !== 0) {
//         element.photo = photo;
//       }

//       if (description && description.length !== 0) {
//         element.description = description;
//       }
//     }
//   }
//   res.json(destinations);
// });

app.put("/destinations/:id", (req, res) => {
  const destId = req.params.id;
  const { name, location, description } = req.body;

  for (let index = 0; index < destinations.length; index++) {
    const element = destinations[index];
    if (element.id == destId) {
      //   element.name = name;
      //   element.location = location;

      if (name && name.length !== 0) {
        element.name = name;
      }

      if (location && location.length !== 0) {
        element.location = location;
      }

      if (description && description.length !== 0) {
        element.description = description;
      }
    }
  }
  res.json(destinations);
});

app.delete("/destinations/:id", (req, res) => {
  const destId = req.params.id;

  const newDestinations = destinations.filter((dest) => dest.id !== destId);

  destinations = newDestinations;

  res.redirect("/destinations");
});
