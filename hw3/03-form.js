let http = require("http");
const port = process.env.PORT || 5001;
var qs = require("node:querystring");

// http://localhost:5001/form should return a form with input elements for username, email, and submit button
// http://localhost:5001/submit should return all the data the user entered

const server = http.createServer((req, res) => {
  const PostHTML = `
    <!DOCTYPE html>
    <html>
    <form method = "post" action = "/submit" class="bg-light border rounded mx-auto mt-5 p-3">
    <h1 class="mt-2 mb-4">Contact Form</h1>
    <div>
      <label for="name">Name *</label>
      <input type="text" class="form-control" id="name" name= "Name" required />
      <label id="validName" style="color: red"></label>
      <br />
      <label for="email">Email *</label>
      <input type="email" id="email" name= "Email" class="form-control" required />
      <label id="validEmail" style="color: red"></label>
      <br />
      <label for="message">Feedback: </label>
      <textarea
        type="text"
        class="form-control"
        id="message"
        rows="3"
        name="Comments"
      ></textarea>
      <br />
      <input type="checkbox" name="Newsletter" id="checkbox"  />
      <label type="text" id="checkbox"> Sign up for the newsletter </label>
      <br />
      <div>
      <button
        type="submit"
      > Submit </button>
      </div>
    </div>
  </form>
</body>
</html>`;
  let body = "";
  if (req.url === "/" || req.url === "/form") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(PostHTML);
    res.end();
  } else if (req.url === "/submit") {
    const FORM_URLENCODED = "application/x-www-form-urlencoded";
    if (req.headers["content-type"] === FORM_URLENCODED) {
      req.on("data", (chunk) => {
        body += chunk.toString();
        body = qs.parse(body);
      }
      );

      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "text/html" });
        
        res.write(
          "Name: " +
            body.Name + `<br/>`
        );
        res.write(
          "Email: " +
            body.Email + `<br/>`
        );

        let comments = body.Comments;
        comments = comments === "" ? "n/a" : comments;
        res.write("Comments: " + comments + `<br/>`);
        
        let newsletter = body.Newsletter === undefined ? "" : "on";
        newsletter =
          newsletter === ""
            ? "No, thank you!" 
            : "Yes, Sign me up for the newsletter.";
        res.write("Newsletter: " + newsletter);
        res.end();
      });
    }
  }
});
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
