v=$1
cd worker

zip ../build/worker-v$v.zip -r *

cd ../frontend

zip ../build/frontend-v$v.zip -r *

cd .. 

aws s3 cp build/worker-v$v.zip  s3://elasticbeanstalk-us-west-2-226942380391/app-from-config/worker-v$v.zip

aws s3 cp build/frontend-v$v.zip  s3://elasticbeanstalk-us-west-2-226942380391/app-from-config/frontend-v$v.zip

# aws elasticbeanstalk  create-application --application-name app-from-config

aws elasticbeanstalk create-application-version --application-name app-from-config --version-label frontend-v$v --process --source-bundle S3Bucket="elasticbeanstalk-us-west-2-226942380391",S3Key="app-from-config/frontend-v$v.zip"

aws elasticbeanstalk create-application-version --application-name app-from-config --version-label worker-v$v  --process --source-bundle S3Bucket="elasticbeanstalk-us-west-2-226942380391",S3Key="app-from-config/worker-v$v.zip"

aws elasticbeanstalk compose-environments --application-name app-from-config --group-name dev --version-labels frontend-v$v worker-v$v


