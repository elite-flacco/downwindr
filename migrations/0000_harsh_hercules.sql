CREATE TABLE "ratings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"spot_id" integer NOT NULL,
	"wind_reliability" integer NOT NULL,
	"beginner_friendly" integer NOT NULL,
	"scenery" integer NOT NULL,
	"uncrowded" integer NOT NULL,
	"local_vibe" integer NOT NULL,
	"overall" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ratings_user_id_spot_id_unique" UNIQUE("user_id","spot_id")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"spot_id" integer NOT NULL,
	"content" text NOT NULL,
	"visit_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "reviews_user_id_spot_id_unique" UNIQUE("user_id","spot_id")
);
--> statement-breakpoint
CREATE TABLE "spots" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"country" text NOT NULL,
	"latitude" real NOT NULL,
	"longitude" real NOT NULL,
	"description" text NOT NULL,
	"wave_size" text NOT NULL,
	"temp_range" text NOT NULL,
	"best_months" text NOT NULL,
	"local_attractions" text NOT NULL,
	"tags" text[] NOT NULL,
	"windguru_code" text,
	"kite_schools" text[],
	"difficulty_level" text,
	"conditions" text[],
	"accommodation_options" text[],
	"food_options" text[],
	"culture" text,
	"average_school_cost" real,
	"average_accommodation_cost" real,
	"number_of_schools" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"display_name" text,
	"bio" text,
	"experience" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"avatar_url" text,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "wind_conditions" (
	"id" serial PRIMARY KEY NOT NULL,
	"spot_id" integer NOT NULL,
	"month" integer NOT NULL,
	"wind_speed" real NOT NULL,
	"wind_quality" text NOT NULL,
	"air_temp" real,
	"water_temp" real,
	"seasonal_notes" text
);
--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_spot_id_spots_id_fk" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_spot_id_spots_id_fk" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wind_conditions" ADD CONSTRAINT "wind_conditions_spot_id_spots_id_fk" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE no action ON UPDATE no action;