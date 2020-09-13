Ingredient.destroy_all()
Unit.destroy_all()
Recipe.destroy_all()
Meal.destroy_all()

lb = Unit.create(name: 'lb')
cup = Unit.create(name: 'cup')
teaspoon = Unit.create(name: 'teaspoon')
na = Unit.create(name: '')

breakfast = Meal.create(name: 'breakfast')
lunch = Meal.create(name: 'lunch')
dinner = Meal.create(name: 'dinner')

ccc = Recipe.create(name: 'ccc', meal: lunch)
l = Recipe.create(name:'a very very very very long name recipe', meal: breakfast)
d = Recipe.create(name:'dddddinddd  dfdddinnd d dddd dd', meal: dinner)

l.ingredients.create(name: 'sea salt', qty: 1, unit: teaspoon);
l.ingredients.create(name: 'large egg yolks', qty: 3, unit: na);
evoo = Ingredient.create(name: 'extra-virgin olive oil', qty: 0.5, recipe: ccc, unit: cup)
d.ingredients.create(name: 'beef', qty: 2, unit: lb)
d.ingredients.create(name: 'oil', qty: 2, unit: cup)
d.ingredients.create(name: 'sea salt', qty: 2, unit: teaspoon)
d.ingredients.create(name: 'apple', qty: 2, unit: na)