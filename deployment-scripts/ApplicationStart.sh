# https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#reference-appspec-file-structure-hooks-list

PM2_HOME='/home/ubuntu/.pm2' pm2 kill
PM2_HOME='/home/ubuntu/.pm2' pm2 start /home/ubuntu/personal-website/server/server.js
