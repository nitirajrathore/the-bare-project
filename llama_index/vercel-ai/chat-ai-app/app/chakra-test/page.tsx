import { Button, HStack } from "@chakra-ui/react"

export default function Demo() {
  return (
    <HStack className="justify-center">
      <Button className="bg-blue-500 text-white">Click me</Button>
      <Button className="bg-blue-500 text-white">Click me</Button>
    </HStack>
  )
}