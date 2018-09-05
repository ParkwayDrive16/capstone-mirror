package model;

public class Vehicle {

    private final String registration;
    private final String make;
    private final String model;
    private final int year;
    private final String colour;
    private final Position position;
    private final int available;

    protected Vehicle(String registration, String make, String model, int year, String colour, Position position,
	    int available) {
	this.registration = registration;
	this.make = make;
	this.model = model;
	this.year = year;
	this.colour = colour;
	this.position = position;
	this.available = available;
    }

    public int getAvaliable() {
	return this.available;
    }

    public String getRegistration() {
	return this.registration;
    }

    public String getMake() {
	return this.make;
    }

    public String getModel() {
	return this.model;
    }

    public int getYear() {
	return this.year;
    }

    /**
     * Returns the make, model & year as a single string
     */
    public String getDescription() {
	return String.format("%s %s (%d)", this.make, this.model, this.year);
    }

    public String getColour() {
	return this.colour;
    }

    public Position getPosition() {
	return this.position;
    }

}
