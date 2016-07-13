class CreateFields < ActiveRecord::Migration
  def change
    create_table :fields do |t|
      t.string   :player1
      t.text   :player2
      t.string   :online_players
    end
  end
end
