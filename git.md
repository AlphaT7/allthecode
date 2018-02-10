##New Setup:

echo "# chess" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/AlphaT7/chess.git
git push -u origin master

##Setup Your GIT Identity
git config --global user.email "you@example.com"
git config --global user.name "Your Name"


##Push to existing:

git remote add origin https://github.com/AlphaT7/chess.git
git push -u origin master