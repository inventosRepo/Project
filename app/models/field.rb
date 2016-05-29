class Field < ActiveRecord::Base
  def self.CreatingField(field, email)
    field.player1 = email
    field.online_players = 1
    field.save
  end

  def self.ConnectingField(field, email)
    field.player2 = email
    field.online_players = 2
    field.save
  end
end
