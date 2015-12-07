class WebviewController < ApplicationController
  def index
    # the webview will pass the device uuid to this controller
    uuid = params[:uuid] || SecureRandom.uuid
    email = "#{uuid}@example.com".downcase

    # look up user, and create as necessary
    @user = User.where(email: email).first
    if @user.blank?
      password = SecureRandom.hex
      @user = User.create({
        email: email,
        password: password,
        password_confirmation: password,
      })
    end

    sign_in @user
  end
end
