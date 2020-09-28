Ingredient.destroy_all()
Recipe.destroy_all()
Meal.destroy_all()

breakfast = Meal.create(name: 'breakfast')
lunch = Meal.create(name: 'lunch')
dinner = Meal.create(name: 'dinner')
d1 = 'In a large skillet, sauté mushrooms in 1 tablespoon of the olive oil until lightly caramelized. Remove mushrooms from heat and set aside in a small bowl.'
d2 = 'Heat remaining olive oil in the same skillet and brown chicken breasts on each side until almost done (They will continue to cook in the sauce in Step 6.). Remove from skillet and keep warm.'
d3 = 'Nestle chicken breasts into the skillet, add the mushrooms and spoon sauce over top. Simmer, uncovered, until chicken is cooked through, about 5 minutes.'
ccc = Recipe.create(directions: d1, name: 'ccc', serving: '1-6', meal: lunch, image_url: 'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/NFOJ7HCOWQI6VFT34B2NGAWH2Q.jpg&w=916')
l = Recipe.create(directions: d2, serving: '2-3', name:'a very very very very long name recipe', meal: breakfast, image_url: 'https://www.helpguide.org/wp-content/uploads/table-with-grains-vegetables-fruit-1536.jpg')
d = Recipe.create(directions: d3, serving: '1', name:'dddddinddd  dfdddinnd d dddd dd', meal: dinner, image_url: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/high-protein-dinners-slow-cooker-meatballs-image-5a04d02.jpg?quality=90&resize=500%2C454')

l.ingredients.create(name: 'sea salt', qty: 1, unit: 'teaspoon');
l.ingredients.create(name: 'large egg yolks', qty: 3, unit: '');
Ingredient.create(name: 'extra-virgin olive oil', qty: 0.5, recipe: ccc, unit: 'cup')
d.ingredients.create(name: 'beef', qty: 2, unit: 'lb')
d.ingredients.create(name: 'oil', qty: 2, unit: 'cup')
d.ingredients.create(name: 'sea salt', qty: 2, unit: 'teaspoon')
d.ingredients.create(name: 'apple', qty: 2, unit: '')