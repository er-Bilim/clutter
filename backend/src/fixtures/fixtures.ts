import mongoose from "mongoose";
import config from "../config.ts";
import User from "../model/user/User.ts";
import Category from "../model/category/Category.ts";
import Product from "../model/product/Product.ts";

const fixtureImagesPath: string = `../fixtures/images`;

const run = async () => {
  await mongoose.connect(config.db);

  const db = mongoose.connection;

  try {
    await db.dropCollection("users");
    await db.dropCollection("categories");
    await db.dropCollection("products");

    const [polskyBobr, cheeseNagibator, capybara] = await User.create([
      {
        username: "polskyBobr",
        password: "polskyBobr12345",
        display_name: "Polsky Bobr",
        phone_number: "+996777777777",
      },
      {
        username: "cheeseNagibator",
        password: "cheeseNagibator12345",
        display_name: "Cheese Nagibator",
        phone_number: "+996555555555",
      },
      {
        username: "capybara",
        password: "capybara12345",
        display_name: "Capybara",
        phone_number: "+996333333333",
      },
    ]);

    polskyBobr!.generateAuthToken();
    await polskyBobr!.save();
    cheeseNagibator!.generateAuthToken();
    await cheeseNagibator!.save();
    capybara!.generateAuthToken();
    await capybara!.save();

    const [cheese, electronics, home, sport] = await Category.create([
      {
        name: "Cheese",
        description: "Cheese description",
      },
      {
        name: "Electronics",
        description: "Electronics description",
      },
      {
        name: "Home",
        description: "Home description",
      },
      {
        name: "Sport",
        description: "Sport description",
      },
    ]);

    await Product.create(
      {
        user: polskyBobr!._id,
        category: cheese!.name,
        title: "Cheese 1",
        description: "Cheese 1 description",
        price: 100,
        image: `${fixtureImagesPath}/cheese1.png`,
      },
      {
        user: polskyBobr!._id,
        category: cheese!.name,
        title: "Cheese 2",
        description: "Cheese 2 description",
        price: 200,
        image: `${fixtureImagesPath}/cheese2.png`,
      },
      {
        user: cheeseNagibator!._id,
        category: electronics!.name,
        title: "Electronics 1",
        description: "Electronics 1 description",
        price: 300,
        image: `${fixtureImagesPath}/electronics1.png`,
      },
      {
        user: cheeseNagibator!._id,
        category: electronics!.name,
        title: "Electronics 2",
        description: "Electronics 2 description",
        price: 400,
        image: `${fixtureImagesPath}/electronics2.png`,
      },
      {
        user: capybara!._id,
        category: home!.name,
        title: "Home 1",
        description: "Home 1 description",
        price: 500,
        image: `${fixtureImagesPath}/home1.png`,
      },
      {
        user: capybara!._id,
        category: home!.name,
        title: "Home 2",
        description: "Home 2 description",
        price: 600,
        image: `${fixtureImagesPath}/home2.png`,
      },
      {
        user: capybara!._id,
        category: sport!.name,
        title: "Sport 1",
        description: "Sport 1 description",
        price: 700,
        image: `${fixtureImagesPath}/sport1.png`,
      },
    );
  } catch (error) {
    console.error(error);
  }
};

run().catch((error) => console.error(error));
