import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const waitlistSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    details: {
      stage: {
        type: String,
        required: false,
      },
      prepDuration: {
        type: String,
        required: false,
      },
      workStatus: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
);

const Waitlist = models.Waitlist || model("Waitlist", waitlistSchema);

try {
  await mongoose.connect(process.env.MONGO_URI || "");
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

// POST request to add a phone number to the waitlist
export async function POST(req: Request) {

  // check mongoose connection
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(process.env.MONGO_URI || "");
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      return new Response(JSON.stringify({ error: "Database connection error" }), {
        status: 500,
      });
    }
  }

  try {
    const { phoneNumber, stage, prepDuration, workStatus } = await req.json();

    if (!phoneNumber) {
      return new Response(JSON.stringify({ error: "Phone number is required" }), {
        status: 400,
      });
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      return new Response(JSON.stringify({ error: "Invalid phone number" }), {
        status: 400,
      });
    }

    const existingEntry = await Waitlist
      .findOne({ phoneNumber })

    if (existingEntry) {
      return new Response(JSON.stringify({ error: "Phone number already exists" }), {
        status: 400,
      });
    }

    const newWaitlistEntry = new Waitlist({
      phoneNumber,
      details: {
        stage,
        prepDuration,
        workStatus,
      },
    });

    const savedEntry = await newWaitlistEntry.save();
    return new Response(JSON.stringify({ message: "Added to waitlist", data: savedEntry }), {
      status: 201,
    });
  } catch (error: any) {
    console.error("Error:", error);

    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}

// GET request to check if a phone number is in the waitlist
export async function GET(req: Request) {
  
  // check mongoose connection
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(process.env.MONGO_URI || "");
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      return new Response(JSON.stringify({ error: "Database connection error" }), {
        status: 500,
      });
    }
  }

  try {

    const url = new URL(req.url);
    const phoneNumber = url.searchParams.get("phoneNumber");

    if (!phoneNumber) {
      return new Response(JSON.stringify({ error: "Phone number is required", found : false }), {
        status: 400,
      });
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      return new Response(JSON.stringify({ error: "Invalid phone number", found : false }), {
        status: 400,
      });
    }

    const existingEntry = await Waitlist.findOne({ phoneNumber });

    if (!existingEntry) {
      return new Response(JSON.stringify({ message: "Phone number not found" , found : false}), {
        status: 200,
      });
    }

    return new Response(JSON.stringify({ message: "Phone number found", found : true, data: existingEntry }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error:", error);

    return new Response(JSON.stringify({ error: "Something went wrong", found : false }), {
      status: 500,
    });
  }
}