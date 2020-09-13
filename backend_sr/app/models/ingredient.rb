class Ingredient < ApplicationRecord
    belongs_to :unit
    belongs_to :recipe
end
