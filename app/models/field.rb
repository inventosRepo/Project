class Field < ActiveRecord::Base
  serialize :player2, Array
  def self.CreatingField(field, email)
    field.player1 = email
    field.online_players = 1
    field.save
  end
  @@arr_tanks = []
  def self.ConnectingField(field, email)
    unless @@arr_tanks.include?(email)
      @@arr_tanks.push(email)
      field.player2 = @@arr_tanks
      field.online_players = 2#@@arr_tanks.length+1
      field.save
    end
  end


end
