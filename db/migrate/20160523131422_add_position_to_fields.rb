class AddPositionToFields < ActiveRecord::Migration
  def up
    add_column :fields, :map, :text
    add_column :fields, :save_game, :integer, default: 0
    add_column :fields, :save_arrs_tanks, :text
  end
end
