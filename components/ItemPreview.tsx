import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import Image from "next/image";

interface Props {
  image: string;
  title: string;
  price: number;
}

const ItemPreview = ({ image, title, price }: Props) => {
  return (
    <Card className="w-[350px]">
      {/* make the entire card a link */}
      <Image src={image} alt={title} width={640} height={640}></Image>
      <CardContent className="flex flex-col items-start justify-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>${price}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ItemPreview;
