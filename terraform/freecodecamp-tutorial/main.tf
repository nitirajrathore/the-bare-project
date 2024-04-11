# provider "aws" {
#     region = "us-east-1"
#     access_key = "<>"
#     secret_key = "<>"
# }


# resource "aws_instance" "my-first-server" {
#   ami           = "ami-080e1f13689e07408"
#   instance_type = "t3.micro"
#   tags = {
#     Name = "HelloWorld"
#   }
# }

# resource "aws_vpc" "first_vpc" {
#   cidr_block = "10.0.0.0/16"

#     tags = {
#     Name = "production"
#   }
# }

# resource "aws_subnet" "subnet_1" {
#   vpc_id     = aws_vpc.first_vpc.id
#   cidr_block = "10.0.1.0/24"

#   tags = {
#     Name = "production"
#   }
# }