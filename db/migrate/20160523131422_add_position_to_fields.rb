class AddPositionToFields < ActiveRecord::Migration
  def change
    add_column :fields, :position_1, :string
    add_column :fields, :position_2, :string
  end
end
