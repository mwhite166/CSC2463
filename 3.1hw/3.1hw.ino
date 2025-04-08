//buttons and led pins
const int button1Pin = 2; // button 1
const int button2Pin = 3; // button 2
const int led1Pin = 9; // led 1
const int led2Pin = 12; // led 2

int button1State = 0;
int button2State = 0;

void setup() {
  pinMode(button1Pin, INPUT);
  pinMode(button2Pin, INPUT);
  pinMode(led1Pin, OUTPUT);
  pinMode(led2Pin, OUTPUT);
}

void loop() {
  button1State = digitalRead(button1Pin);
  button2State = digitalRead(button2Pin);

  if (button1State == HIGH) {
    blinkPattern1();
  } else if (button2State == HIGH) {
    blinkPattern2();
  }
}

void blinkPattern1() {
  for (int i = 0; i < 5; i++) {
    digitalWrite(led1Pin, HIGH);
    delay(200);
    digitalWrite(led1Pin, LOW);
    delay(200);
  }
  morseCode("Hello");
}

void blinkPattern2() {
  for (int i = 0; i < 3; i++) {
    digitalWrite(led2Pin, HIGH);
    delay(500);
    digitalWrite(led2Pin, LOW);
    delay(500);
  }
  morseCode("Scary");
}

void morseCode(String message) {
  for (int i = 0; i < message.length(); i++) {
    char c = message.charAt(i);
    if (c == ' ') {
      delay(700);
    } else {
      int dotDash = (c == 'S' || c == 'H') ? 200 : 600;
      digitalWrite(led1Pin, HIGH);
      delay(dotDash);
      digitalWrite(led1Pin, LOW);
      delay(200);
    }
  }
}