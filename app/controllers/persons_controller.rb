class PersonsController < ApplicationController
  before_filter :check_for_signed_in
  def profile
  end
end
