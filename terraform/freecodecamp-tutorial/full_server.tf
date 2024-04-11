provider "aws" {
    region = "us-east-1"
}


resource "aws_vpc" "my_vpc" {
  cidr_block = "10.0.0.0/16" # Specify the CIDR block for your VPC
  tags = {
    Name = "prod"
  }
}


# Create Internet Gateway
resource "aws_internet_gateway" "my_igw" {
  vpc_id = aws_vpc.my_vpc.id # Attach the Internet Gateway to the VPC created earlier

  tags = {
    Name = "prod"
  }
}

variable "subnet_cidr" {
  description = "cidr for subnet"
  type = string
  default = "10.0.1.0/24"
  
}

# Create Custom Route Table
resource "aws_route_table" "my_route_table" {
  vpc_id = aws_vpc.my_vpc.id # Associate the route table with the VPC

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my_igw.id
  }

  route {
    ipv6_cidr_block = "::/0"
    gateway_id = aws_internet_gateway.my_igw.id
  }

  tags = {
    Name = "prod"
  }
}


resource "aws_subnet" "my_subnet_1" {
  vpc_id     = aws_vpc.my_vpc.id # Associate the subnet with the VPC
  cidr_block = var.subnet_cidr # "10.0.1.0/24"      # Specify the CIDR block for the subnet

  availability_zone = "us-east-1a" # Specify the availability zone for the subnet if needed

  tags = {
    Name = "prod"
  }
}


# Associate Route Table with Subnet
resource "aws_route_table_association" "subnet_association" {
  subnet_id      = aws_subnet.my_subnet_1.id
  route_table_id = aws_route_table.my_route_table.id
}

# Create Security Group
resource "aws_security_group" "my_security_group" {
  name        = "my-security-group"
  description = "My security group for web servers"
  vpc_id      = aws_vpc.my_vpc.id # Associate the security group with the VPC

  # Define ingress rules
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow traffic from anywhere
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow traffic from anywhere
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow traffic from anywhere
  }

  # Define egress rules
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # Allow all outbound traffic
    cidr_blocks = ["0.0.0.0/0"] # Allow traffic to anywhere
  }

  tags = {
    Name = "allow_web_access_sg"
  }
}

# Create Network Interface
resource "aws_network_interface" "my_network_interface" {
  subnet_id       = aws_subnet.my_subnet_1.id
  private_ips     = ["10.0.1.50"] # Specify one or more private IP addresses
  security_groups = [aws_security_group.my_security_group.id] # Attach the security group to the network interface

  depends_on = [ aws_internet_gateway.my_igw ]
  tags = {
    Name = "my-network-interface"
  }
}

# Create Elastic IP
resource "aws_eip" "my_eip" {
  domain = "vpc" # Specify if the Elastic IP should be in a VPC or not. Set to true for VPC, false for EC2-Classic.

  # Optionally, you can specify the instance ID to associate the Elastic IP with
  # instance = aws_instance.my_instance.id

  network_interface = aws_network_interface.my_network_interface.id
  associate_with_private_ip = "10.0.1.50"

  depends_on = [aws_internet_gateway.my_igw, aws_instance.web_server] 
  tags = {
    Name = "my-elastic-ip"
  }
}


resource "aws_instance" "web_server" {
  ami = "ami-080e1f13689e07408"
  instance_type = "t2.micro"

  availability_zone = "us-east-1a"
  key_name = "terraform-keypair"

  network_interface {
    device_index = 0
    network_interface_id = aws_network_interface.my_network_interface.id
  }

  user_data = <<-EOF
              #!/bin/bash
              sudo apt update -y
              sudo apt install apache2 -y 
              sudo systemctl start apache2
              sudo bash -c 'echo your very first web server > /var/www/html/index.html'  
              EOF

  depends_on = [ aws_security_group.my_security_group ]
  tags = {
    Name = "my_web_server"
  }
}

output "server_public_ip" {
  value = aws_eip.my_eip.public_ip
}

output "server_private_ip" {
  value = aws_instance.web_server.private_ip
}