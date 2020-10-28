# Pre hex microbitcode

def on_button_pressed_a():
    basic.show_leds("""
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        """)
input.on_button_pressed(Button.A, on_button_pressed_a)

# change led
def on_button_pressed_b():
    basic.show_leds("""
        . . # . .
        . # # . .
        . . # . .
        . . # . .
        . # # # .
        """)
input.on_button_pressed(Button.B, on_button_pressed_b)

# change led
basic.show_leds("""
    . . # . .
    . # # . .
    . . # . .
    . . # . .
    . # # # .
    """)
serial.redirect(SerialPin.USB_TX, SerialPin.USB_RX, BaudRate.BAUD_RATE115200)
serial.redirect_to_usb()

# change ? to id you want on microbit
def on_forever():
    serial.write_numbers([?, input.temperature(), input.light_level()])
    basic.pause(2000)
basic.forever(on_forever)