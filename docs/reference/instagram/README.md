# Instagram reference

Mood material from `@anairamodarnoc`. It is not site content (see `CLAUDE.md` §4).
Images are gitignored and stay on this machine.

## Collect the full profile

`anairamodarnoc_grid.json` covers 33 of 66 posts, and only the first slide of
each carousel. To get everything:

1. Open `https://www.instagram.com/anairamodarnoc/` in Chrome while logged in.
2. Open DevTools → Console (`⌥⌘J`).
3. Paste all of `collect.js` and press Enter. Allow multiple downloads when
   Chrome asks.
4. Move the downloaded `anairamodarnoc_full.json` and
   `anairamodarnoc_NNN_S.jpg` files into this folder. `NNN` is the post number,
   oldest first. `S` is the slide number.

The script reads the endpoints Instagram's own web app uses for a logged-in
visitor, so it only sees what your account can see. If Instagram changes those
endpoints and the script returns a 4xx error, the old grid files still work as
a reference.

Numbering note: the existing `anairamodarnoc_001…033.jpg` files are numbered
**newest first**. `collect.js` numbers **oldest first**. Photo numbers in
`00-DISCOVERY.md` refer to the existing files.
