class CreateFields < ActiveRecord::Migration
  def change
    create_table :fields do |t|
      t.string   :player1
      t.string   :player2
      t.string   :count
    end
  end
end
