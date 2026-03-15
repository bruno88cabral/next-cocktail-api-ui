interface Props {
  params: Promise<{ id: string }>;
}

export default async function DrinkDetailsPage({ params }: Props) {
  const { id } = await params;

  return (
    <main>
      <h1>Drink #{id}</h1>
    </main>
  );
}
