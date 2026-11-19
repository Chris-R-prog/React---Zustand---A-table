import { http, HttpResponse } from "msw/http";

export const handlers = [
  //Simulation d'une recherche par catégories
  http.get("*/filter.php", ({ request }) => {
    console.log("MSW intercepte :", request.url);
    const category = new URL(request.url).searchParams.get("c");

    if (category !== "Pasta") {
      return HttpResponse.json({ meals: null });
    }

    return HttpResponse.json({
      meals: [
        {
          idMeal: "1",
          strMeal: "Spaghetti",
          strMealThumb: "spaghetti.jpg",
        },
        {
          idMeal: "2",
          strMeal: "Lasagnes",
          strMealThumb: "lasagnes.jpg",
        },
      ],
    });
  }),

  // Simulation d'une recherche sans résultat
  http.get("*/search.php", () => {
    return HttpResponse.json({
      meals: null,
    });
  }),
];
