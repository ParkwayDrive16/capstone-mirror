package model;

import java.time.LocalDateTime;

public class Booking {

    private final int id;
    private final LocalDateTime timestamp;
    private final Vehicle vehicle;
    private final String customerId;
    private final int duration;
    private final Position startLocation;
    private final double cost;
    private final boolean paid;

    protected Booking(int id, LocalDateTime timestamp, Vehicle vehicle, String customerId, int duration,
	    Position startLocation, double cost, boolean paid) {
	this.id = id;
	this.timestamp = timestamp;
	this.vehicle = vehicle;
	this.customerId = customerId;
	this.duration = duration;
	this.startLocation = startLocation;
	this.cost = cost;
	this.paid = paid;
    }

    public boolean getPaid() {
	return this.paid;
    }

    public int getId() {
	return this.id;
    }

    public LocalDateTime getTimestamp() {
	return this.timestamp;
    }

    public Vehicle getVehicle() {
	return this.vehicle;
    }

    public String getCustomerId() {
	return this.customerId;
    }

    public int getDuration() {
	return this.duration;
    }

    public Position getStartLocation() {
	return this.startLocation;
    }

    public double getCost() {
	return this.cost;
    }

}