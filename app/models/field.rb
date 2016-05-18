class Field < ActiveRecord::Base
  def self.crtgfield(field, email)    
    field.player1 = email
    field.count = 1
    field.save
  end
end
