
import React, { useState } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

const motivationalQuotes = [
  // Success & Achievement
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "Innovation distinguishes between a leader and a follower. - Steve Jobs",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don't stop when you're tired. Stop when you're done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It's going to be hard, but hard does not mean impossible.",
  "Don't wait for opportunity. Create it.",
  "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
  "The key to success is to focus on goals, not obstacles.",
  "Dream it. Believe it. Build it.",

  // Perseverance & Resilience
  "It is during our darkest moments that we must focus to see the light. - Aristotle",
  "The only impossible journey is the one you never begin. - Tony Robbins",
  "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
  "It's not whether you get knocked down, it's whether you get up. - Vince Lombardi",
  "Failure will never overtake me if my determination to succeed is strong enough. - Og Mandino",
  "We generate fears while we sit. We overcome them by action. - Dr. Henry Link",
  "Fall seven times and stand up eight. - Japanese Proverb",
  "The comeback is always stronger than the setback.",
  "Difficult roads often lead to beautiful destinations.",
  "Stars can't shine without darkness.",
  "Turn your wounds into wisdom. - Oprah Winfrey",
  "Every champion was once a contender who refused to give up. - Rocky Balboa",
  "The phoenix must burn to emerge. - Janet Fitch",
  "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
  "You are braver than you believe, stronger than you seem, and smarter than you think. - A.A. Milne",
  "Rock bottom became the solid foundation on which I rebuilt my life. - J.K. Rowling",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us. - Ralph Waldo Emerson",
  "The only way out is through. - Robert Frost",
  "Tough times never last, but tough people do. - Robert H. Schuller",
  "You have been assigned this mountain to show others it can be moved.",

  // Dreams & Vision
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "All our dreams can come true, if we have the courage to pursue them. - Walt Disney",
  "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
  "Go confidently in the direction of your dreams. Live the life you have imagined. - Henry David Thoreau",
  "When you have a dream, you've got to grab it and never let go. - Carol Burnett",
  "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  "A goal is a dream with a deadline. - Napoleon Hill",
  "The biggest adventure you can take is to live the life of your dreams. - Oprah Winfrey",
  "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
  "Your dreams are valid.",
  "The future belongs to those who prepare for it today.",
  "Dreams don't work unless you do. - John C. Maxwell",
  "If you can dream it, you can do it. - Walt Disney",
  "Follow your dreams, they know the way.",
  "A dream becomes a goal when action is taken toward its achievement. - Bo Bennett",
  "The distance between your dreams and reality is called action.",
  "Dreams are the seedlings of realities. - James Allen",
  "Hold fast to dreams, for if dreams die, life is a broken-winged bird that cannot fly. - Langston Hughes",
  "All men dream, but not equally. Those who dream by night wake in the day to find that it was vanity: but the dreamers of the day are dangerous men, for they may act on their dreams with open eyes, to make them possible. - T.E. Lawrence",
  "The only thing worse than being blind is having sight but no vision. - Helen Keller",

  // Self-Belief & Confidence
  "Whether you think you can or you think you can't, you're right. - Henry Ford",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
  "You have to believe in yourself when no one else does. - Serena Williams",
  "Confidence is not 'they will like me'. Confidence is 'I'll be fine if they don't'.",
  "Be yourself; everyone else is already taken. - Oscar Wilde",
  "What other people think of me is none of my business. - RuPaul",
  "You are enough just as you are. - Meghan Markle",
  "Don't let anyone ever dull your shine.",
  "You were born to be real, not to be perfect.",
  "Be proud of who you are, not ashamed of how someone else sees you.",
  "Your potential is endless.",
  "You are capable of amazing things.",
  "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
  "The most beautiful thing you can wear is confidence.",
  "You are your only limit.",
  "Self-confidence is the best outfit. Rock it and own it.",
  "You have within you right now, everything you need to deal with whatever the world can throw at you. - Brian Tracy",
  "Trust yourself. You know more than you think you do. - Benjamin Spock",
  "No one can make you feel inferior without your consent. - Eleanor Roosevelt",

  // Action & Change
  "Be the change that you wish to see in the world. - Mahatma Gandhi",
  "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you. - Steve Jobs",
  "People who are crazy enough to think they can change the world, are the ones who do. - Rob Siltanen",
  "I can't change the direction of the wind, but I can adjust my sails to always reach my destination. - Jimmy Dean",
  "Life is like riding a bicycle. To keep your balance, you must keep moving. - Albert Einstein",
  "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
  "You don't have to be great to get started, but you have to get started to be great. - Les Brown",
  "A year from now you may wish you had started today. - Karen Lamb",
  "The way I see it, if you want the rainbow, you gotta put up with the rain. - Dolly Parton",
  "Change your thoughts and you change your world. - Norman Vincent Peale",
  "Progress, not perfection.",
  "Small steps every day lead to big changes over time.",
  "You can't go back and change the beginning, but you can start where you are and change the ending. - C.S. Lewis",
  "If you want something you've never had, you must be willing to do something you've never done. - Thomas Jefferson",
  "The only constant in life is change. - Heraclitus",
  "Yesterday is history, tomorrow is a mystery, today is a gift. That's why it's called the present. - Eleanor Roosevelt",
  "Life begins at the end of your comfort zone. - Neale Donald Walsch",
  "If you don't like something, change it. If you can't change it, change your attitude. - Maya Angelou",
  "Be willing to be a beginner every single morning. - Meister Eckhart",
  "The secret of change is to focus all of your energy not on fighting the old, but on building the new. - Socrates",

  // Happiness & Positivity
  "Life is what happens to you while you're busy making other plans. - John Lennon",
  "Don't let yesterday take up too much of today. - Will Rogers",
  "Try to be a rainbow in someone else's cloud. - Maya Angelou",
  "You do not find the happy life. You make it. - Camilla Eyring Kimball",
  "Inspiration comes from within yourself. One has to be positive. When you're positive, good things happen. - Deep Roy",
  "Sometimes you will never know the value of a moment until it becomes a memory. - Dr. Seuss",
  "Happiness is not something ready made. It comes from your own actions. - Dalai Lama",
  "The purpose of our lives is to be happy. - Dalai Lama",
  "Life is 10% what happens to you and 90% how you react to it. - Charles R. Swindoll",
  "Keep your face always toward the sunshine—and shadows will fall behind you. - Walt Whitman",
  "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence. - Helen Keller",
  "Positive anything is better than negative nothing. - Elbert Hubbard",
  "The only way to make sense out of change is to plunge into it, move with it, and join the dance. - Alan Watts",
  "Life isn't about waiting for the storm to pass, it's about learning to dance in the rain.",
  "Choose to be optimistic, it feels better. - Dalai Lama",
  "Happiness is a choice, not a result. Nothing will make you happy until you choose to be happy.",
  "Every day may not be good, but there's something good in every day.",
  "Smile, it's free therapy.",
  "Collect moments, not things.",
  "Find joy in the ordinary.",

  // Wisdom & Life Lessons
  "Security is mostly a superstition. Life is either a daring adventure or nothing at all. - Helen Keller",
  "No matter what you're going through, there's a light at the end of the tunnel. - Demi Lovato",
  "It is our attitude at the beginning of a difficult task which will affect its outcome more than anything else. - William James",
  "Just don't give up trying to do what you really want to do. Where there is love and inspiration, I don't think you can go wrong. - Ella Fitzgerald",
  "Limit your 'always' and your 'nevers'. - Amy Poehler",
  "The mind is everything. What you think you become. - Buddha",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit. - Aristotle",
  "The only true wisdom is in knowing you know nothing. - Socrates",
  "In the middle of difficulty lies opportunity. - Albert Einstein",
  "Life is really simple, but we insist on making it complicated. - Confucius",
  "The journey of a thousand miles begins with one step. - Lao Tzu",
  "It does not matter how slowly you go as long as you do not stop. - Confucius",
  "The best revenge is massive success. - Frank Sinatra",
  "Don't judge each day by the harvest you reap but by the seeds that you plant. - Robert Louis Stevenson",
  "The two most important days in your life are the day you are born and the day you find out why. - Mark Twain",
  "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. - Mark Twain",
  "The only impossible journey is the one you never begin. - Tony Robbins",
  "What we think, we become. - Buddha",
  "Life is not measured by the number of breaths we take, but by the moments that take our breath away. - Maya Angelou",
  "The best way to predict the future is to create it. - Peter Drucker",

  // Leadership & Impact
  "A leader is one who knows the way, goes the way, and shows the way. - John C. Maxwell",
  "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things. - Ronald Reagan",
  "Leadership is not about being in charge. It is about taking care of those in your charge. - Simon Sinek",
  "The function of leadership is to produce more leaders, not more followers. - Ralph Nader",
  "If your actions inspire others to dream more, learn more, do more and become more, you are a leader. - John Quincy Adams",
  "A true leader has the confidence to stand alone, the courage to make tough decisions, and the compassion to listen to the needs of others.",
  "Leadership is the capacity to translate vision into reality. - Warren Bennis",
  "The art of leadership is saying no, not saying yes. It is very easy to say yes. - Tony Blair",
  "Before you are a leader, success is all about growing yourself. When you become a leader, success is all about growing others. - Jack Welch",
  "Leadership is not a position or a title, it is action and example. - Cory Booker",
  "Great leaders are willing to sacrifice their own personal interests for the good of the team. - John Wooden",
  "The challenge of leadership is to be strong, but not rude; be kind, but not weak; be bold, but not bully; be thoughtful, but not lazy; be humble, but not timid; be proud, but not arrogant; have humor, but without folly. - Jim Rohn",
  "A good leader takes a little more than his share of the blame, a little less than his share of the credit. - Arnold H. Glasow",
  "Leadership is about making others better as a result of your presence and making sure that impact lasts in your absence. - Sheryl Sandberg",
  "The price of greatness is responsibility. - Winston Churchill",

  // Creativity & Innovation
  "Creativity is intelligence having fun. - Albert Einstein",
  "The secret to creativity is knowing how to hide your sources. - Einstein",
  "Innovation is the ability to see change as an opportunity - not a threat. - Steve Jobs",
  "Creativity takes courage. - Henri Matisse",
  "The creative adult is the child who survived. - Ursula K. Le Guin",
  "You can't use up creativity. The more you use, the more you have. - Maya Angelou",
  "Imagination is more important than knowledge. - Albert Einstein",
  "Every artist was first an amateur. - Ralph Waldo Emerson",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "Think outside the box, collapse the box, and take a fucking sharp knife to it. - Banksy",
  "Creativity is contagious, pass it on. - Albert Einstein",
  "The chief enemy of creativity is good sense. - Pablo Picasso",
  "Creativity is seeing what others see and thinking what no one else ever thought. - Albert Einstein",
  "Don't think. Thinking is the enemy of creativity. - Ray Bradbury",
  "Creativity is the currency of the future. - Shawn Coyne",

  // Time & Opportunity
  "Time is more valuable than money. You can get more money, but you cannot get more time. - Jim Rohn",
  "The trouble is, you think you have time. - Buddha",
  "Time flies over us, but leaves its shadow behind. - Nathaniel Hawthorne",
  "Lost time is never found again. - Benjamin Franklin",
  "Time is what we want most, but what we use worst. - William Penn",
  "Don't wait. The time will never be just right. - Napoleon Hill",
  "Time is the most valuable thing we have and the most likely to be wasted. - Benjamin Franklin",
  "Yesterday's the past, tomorrow's the future, but today is a gift. That's why it's called the present. - Bil Keane",
  "Time you enjoy wasting is not wasted time. - Marthe Troly-Curtin",
  "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
  "Opportunity is missed by most people because it is dressed in overalls and looks like work. - Thomas Edison",
  "In the midst of winter, I found there was, within me, an invincible summer. - Albert Camus",
  "Opportunities don't happen. You create them. - Chris Grosser",
  "A wise person learns from the mistakes of others, a fool learns from his own, but a genius learns from neither because he avoids the situation entirely.",
  "The future depends on what you do today. - Mahatma Gandhi"
];

const { width, height } = Dimensions.get('window');

export default function MainScreen() {
  const [currentQuote, setCurrentQuote] = useState("Tap the button for inspiration!");
  const [buttonScale] = useState(new Animated.Value(1));

  const handleButtonPress = () => {
    console.log('Button pressed - generating new quote');
    
    // Haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Button animation
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Get random quote
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    const newQuote = motivationalQuotes[randomIndex];
    setCurrentQuote(newQuote);
    console.log('New quote selected:', newQuote);
    console.log(`Quote ${randomIndex + 1} of ${motivationalQuotes.length} total quotes`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Quote Display Area */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>{currentQuote}</Text>
        </View>

        {/* Large Button */}
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleButtonPress}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Inspired</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Quote Counter */}
        <Text style={styles.counterText}>
          {motivationalQuotes.length} quotes available
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  quoteText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: '#3498db',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 8px 20px rgba(52, 152, 219, 0.3)',
    elevation: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
  },
  counterText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 80,
    fontWeight: '400',
  },
});
