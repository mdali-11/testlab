import Exam from "@/models/test.model";
import User from "@/models/users.model";
import { connectDatabase } from "../../../../utils/db";
import protectWith from "../../../middleware/protectWith";
import roleChecker from "../../../middleware/roleChecker";

connectDatabase();

const handler = async (req, res) => {
  /*
  let testSeries = await Exam.create({
    tag: "RAILWAY",
    title: "NTPC 2023",
    question: [
      {
        s_n: 1,
        question: "What is the capital of India?",
        options: [
          {
            a: "Mumbai",
          },
          {
            b: "Delhi",
          },
          {
            c: "Chennai",
          },
          {
            d: "Kolkata",
          },
        ],
        rightAnswer: "Delhi",
      },
      {
        s_n: 2,
        question: "Who is the current Prime Minister of India?",
        options: [
          {
            a: "Sonia Gandhi",
          },
          {
            b: "Narendra Modi",
          },
          {
            c: "Rahul Gandhi",
          },
          {
            d: "Manmohan Singh",
          },
        ],
        rightAnswer: "Narendra Modi",
      },
      {
        s_n: 3,
        question: "What is the currency of USA?",
        options: [{ a: "Dollar" }, { b: "Euro" }, { c: "Yen" }, { d: "Rupee" }],
        rightAnswer: "Dollar",
      },
      {
        s_n: 4,
        question: "Which river is known as the 'lifeline of Mumbai'?",
        options: [
          { a: "Ganga" },
          { b: "Yamuna" },
          { c: "Godavari" },
          { d: "Mithi" },
        ],
        rightAnswer: "Mithi",
      },
      {
        s_n: 5,
        question: "What is the highest mountain peak in the world?",
        options: [
          { a: "Mount Everest" },
          { b: "K2" },
          { c: "Lhotse" },
          { d: "Makalu" },
        ],
        rightAnswer: "Mount Everest",
      },
      {
        s_n: 6,
        question: "What is the largest planet in our solar system?",
        options: [
          { a: "Jupiter" },
          { b: "Saturn" },
          { c: "Uranus" },
          { d: "Neptune" },
        ],
        rightAnswer: "Jupiter",
      },
      {
        s_n: 7,
        question: "Which country is known as the 'Land of the Rising Sun'?",
        options: [
          { a: "China" },
          { b: "India" },
          { c: "Japan" },
          { d: "Russia" },
        ],
        rightAnswer: "Japan",
      },
      {
        s_n: 8,
        question: "What is the largest mammal in the world?",
        options: [
          { a: "Elephant" },
          { b: "Giraffe" },
          { c: "Whale" },
          { d: "Hippopotamus" },
        ],
        rightAnswer: "Whale",
      },
      {
        s_n: 9,
        question: "What is the capital of China?",
        options: {
          a: "Beijing",
          b: "Shanghai",
          c: "Hong Kong",
          d: "Tianjin",
        },
        rightAnswer: "Beijing",
      },
      {
        s_n: 10,
        question: "What is the capital of Japan?",
        options: {
          a: "Tokyo",
          b: "Osaka",
          c: "Yokohama",
          d: "Kyoto",
        },
        rightAnswer: "Tokyo",
      },
      {
        s_n: 11,
        question: "What is the capital of Australia?",
        options: {
          a: "Sydney",
          b: "Melbourne",
          c: "Canberra",
          d: "Perth",
        },
        rightAnswer: "Canberra",
      },
      {
        s_n: 12,
        question: "What is the capital of Canada?",
        options: {
          a: "Toronto",
          b: "Montreal",
          c: "Vancouver",
          d: "Ottawa",
        },
        rightAnswer: "Toronto",
      },
      {
        s_n: 13,
        question: "What is the capital of Brazil?",
        options: {
          a: "Rio de Janeiro",
          b: "São Paulo",
          c: "Brasília",
          d: "Recife",
        },
        rightAnswer: "Brasília",
      },
      {
        s_n: 14,
        question: "What is the national bird of India?",
        options: [
          {
            a: "Peacock",
            b: "Eagle",
            c: "Sparrow",
            d: "Penguin",
          },
        ],
        rightAnswer: "Peacock",
      },
      {
        s_n: 5,
        question: "Which is the largest desert in the world?",
        options: [
          {
            a: "Sahara",
            b: "Arabian",
            c: "Thar",
            d: "Antarctica",
          },
        ],
        rightAnswer: "Sahara",
      },
    ],
    price: 250,
    time: 300,
  });

  let newfkg = await Exam.find();
  let question = newfkg[0].question[0].options;
  question.map((item) => {
    console.log(item.a);
  });

* */

  //PURCHASE LOGIC

  //find test serires in basis of tag and title
  //we can also do it from id testsereis id
  const test = await Exam.findOne({ _id:req.body._id });
  console.log("test:", test);

  test._id = undefined;
  if (!req.user.test_series) {
    req.user.test_series = [];
    req.user.test_series.push(test);
  } else if (req.user.test_series) {
    let existsTest = false;
    req.user.test_series.map((item) => {
      if (item.title === test.title) {
        existsTest = true;
      }
    });

    if (existsTest) {
      return res.status(401).json({
        success: false,
        message: "testing already added in your cart.",
      });
    }

    req.user.test_series = [...req.user.test_series, test];
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { test_series: req.user.test_series },
    { new: true }
  );

  res.status(201).json({
    success: true,
    message: "Test successfully added.",
  });
};

export default protectWith(handler);
