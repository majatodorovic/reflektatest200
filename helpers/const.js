export const queryKeys = {
  page: "strana",
  sort: "redosled",
  limit: "prikaz",
};

export const sortKeys = [
  {
    label: "Novo",
    field: "new",
    direction: "asc",
  },
  {
    label: "Staro",
    field: "new",
    direction: "desc",
  },
  {
    label: "Naziv rastuće",
    field: "name",
    direction: "asc",
  },
  {
    label: "Naziv opadajuće",
    field: "name",
    direction: "desc",
  },
  {
    label: "Na stanju rastuće",
    field: "inventory",
    direction: "asc",
  },
  {
    label: "Na stanju opadajuće",
    field: "inventory",
    direction: "desc",
  },
  // {
  //   label: "Cena od niže prema višoj",
  //   field: "price",
  //   direction: "asc",
  // },
  // {
  //   label: "Cena od više prema nižoj",
  //   field: "price",
  //   direction: "desc",
  // },
];
